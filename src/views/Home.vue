<template>
  <navigation-bar />
  <div class="flex justify-between">
    <div class="inline-block" />
    <form
      class="space-y-6 m-4 p-4 inline-block bg-blue-100 rounded"
      @submit.prevent="submitForm"
    >
      <h1 v-if="!isEdit">เพิ่มรายการใหม่</h1>
      <h1 v-else>แก้ไขข้อมูล</h1>
      <p>
        รายการ :
        <input
          type="text"
          class="border border-black rounded"
          v-model="enteredDescription"
        />
      </p>
      <sup v-show="unavailableDescription"
        >*โปรดเติมข้อความในช่องว่างให้เรียบร้อย</sup
      >
      <p>
        รายรับ :
        <input
          type="number"
          class="border border-black rounded"
          v-model="enteredReceivable"
        />
      </p>
      <sup v-show="unavailableReceivable"
        >*โปรดระบุจำนวนเงินให้เรียบร้อย (หากไม่มีให้ใส่ 0)</sup
      >
      <p>
        รายจ่าย :
        <input
          type="number"
          class="border border-black rounded"
          v-model="enteredPayable"
        />
      </p>
      <sup v-show="unavailablePayable"
        >*โปรดระบุจำนวนเงินให้เรียบร้อย (หากไม่มีให้ใส่ 0)</sup
      >
      <p>
        วัน/เดือน/ปี :
        <input class="bg-white rounded" type="date" v-model="enteredDate" />
      </p>
      <sup v-show="unavailableDate">*โปรดระบุ วัน/เดือน/ปี ให้เรียบร้อย</sup>
      <br />
      <input type="submit" value="ยืนยัน" />
      <button v-on:click="cancelEdit" v-show="isEdit">ยกเลิก</button>
    </form>
    <div class="inline-block" />
  </div>

  <Table :results="results" @oldRecord="showData" />
</template>

<script>
import Table from "@/components/Table.vue";

export default {
  name: "Home",
  components: {
    Table,
  },
  data() {
    return {
      enteredDescription:"",
      enteredReceivable:null,
      enteredPayable:null,
      enteredDate:"",
      unavailableDescription:false,
      unavailableReceivable:false,
      unavailablePayable:false,
      unavailableDate:false,
      isEdit:false,
      editId:null,
      results: [],
    };
  },
  methods: {
    submitForm(){
      this.unavailableDescription = this.enteredDescription === "" ? true : false;
      this.unavailableReceivable = this.enteredReceivable=== null ? true : false;
      this.unavailablePayable = this.enteredPayable=== null ? true : false;
      this.unavailableDate = this.enteredDate === "" ? true : false;
      if(this.unavailableDescription || this.unavailableReceivable || this.unavailablePayable || this.unavailableDate){
        return;
      }
      this.enteredReceivable = parseInt(this.enteredReceivable);
      this.enteredPayable = parseInt(this.enteredPayable);
      if(this.isEdit ===true){
        this.editData({description:this.enteredDescription,receivable:this.enteredReceivable,payable:this.enteredPayable,date:this.enteredDate});
      }
      else{
        this.postData({description:this.enteredDescription,receivable:this.enteredReceivable,payable:this.enteredPayable,date:this.enteredDate});
      }
     
    },
    async getData() {
      try {
        const response = await fetch("http://localhost:5000/Ledger");
        const data = await response.json();
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    async postData(newRecord){
      try{
        const response = await fetch("http://localhost:5000/Ledger", {
          method:"POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            description: newRecord.description,
            receivable: newRecord.receivable,
            payable: newRecord.payable,
            date: newRecord.date
          })
        });
        const data = await response.json();
        this.results = [...this.results, data];
        this.enteredDescription="";
      this.enteredReceivable=null;
      this.enteredPayable=null;
      this.enteredDate="";
      }catch(error){
        console.log(error);
      }
    },
    showData(oldRecord){
      this.isEdit = true;
      this.editId = oldRecord.id;
      this.enteredDescription = oldRecord.description;
      this.enteredReceivable = oldRecord.receivable;
      this.enteredPayable = oldRecord.payable;
      this.enteredDate = oldRecord.date;
    },
    async editData(editRecord){
      try{
      const response = await fetch("http://localhost:5000/Ledger/"+this.editId, {
        method:"PUT",
        headers: {
              "content-type": "application/json",
        },
        body: JSON.stringify({
              description: editRecord.description,
              receivable: editRecord.receivable,
              payable: editRecord.payable,
              date: editRecord.date
            })
      });
      const data = await response.json();
      this.results = this.results.map((result)=>
       result.id === this.editId 
       ?{...result,description:data.description,receivable:data.receivable,payable:data.payable,date:data.date}
       : result);
       this.isEdit = false;
       this.enteredDescription="";
      this.enteredReceivable=null;
      this.enteredPayable=null;
      this.enteredDate="";
      this.editId="";
      }catch(error){
        console.log(error);
      }
    },
    cancelEdit(){
      this.isEdit = false;
      this.enteredDescription="";
      this.enteredReceivable=null;
      this.enteredPayable=null;
      this.enteredDate="";
      this.editId="";
    }
  },
  async created() {
    this.results = await this.getData();
  },
};
</script>
<style scoped>
sup {
  color: red;
}
</style>

