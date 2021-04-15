<template>
  <table class="table-fixed mx-auto p-5">
    <thead>
      <tr style="background-color:white;">
        <th class="w-1/2 ...">รายการ</th>
        <th class="w-1/6 ...">รายรับ</th>
        <th class="w-1/6 ...">รายจ่าย</th>
        <th class="w-1/6 ...">วัน/เดือน/ปี</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="result in filterResult" :key="result.id">
        <td class="space-x-3" id="tddescription">
          <button @click="deleteData(result)">
            <img
              src="../../public/img/unchecked.png"
              width="20"
              class="inline-block"
            />
          </button>
          <button @click="editData(result)">
            <img
              src="../../public/img/edit.png"
              width="20"
              class="inline-block"
            />
          </button>
          {{ result.description }}
        </td>
        <td id="tdcontent">{{ result.receivable }}</td>
        <td id="tdcontent">{{ result.payable }}</td>
        <td id="tdcontent">{{ coverDate[result.id-1] }}</td>
      </tr>
      <tr style=" background-color:gray">
        <td style="text-align: center;">ทั้งหมด</td>
        <td id="tdcontent">{{ totalReceivable }}</td>
        <td id="tdcontent">{{ totalPayable }}</td>
        <td id="tdcontent" class="bg-yellow-300">{{ calculatedTotal }}</td>
      </tr>
    </tbody>
  </table>
</template>
<script>
export default {
  name: "Form",
  props: {
    results: {
      type: Array,
    },
    searchV:{
      type: String
    }
  },
  data() {
    return {

    };
  },
  methods:{
    editData(oldRecord){
      this.$emit('oldRecord',oldRecord);
    },
    deleteData(deleteRecord){
       this.$emit('deleteRecord',deleteRecord);
    }
  }
  ,
  computed: {
    totalPayable: function () {
      let total = 0;
      for (let i = 0; i < this.results.length; i++) {
        total += this.results[i].payable;
      }
      return total;
    },
    totalReceivable: function () {
      let total = 0;
      for (let i = 0; i < this.results.length; i++) {
        total += this.results[i].receivable;
      }
      return total;
    },
    calculatedTotal: function () {
      return this.totalReceivable - this.totalPayable;
    },
    coverDate: function () {
      let newDate = [];
      for (let i = 0; i < this.results.length; i++) {
        let coverdate = new Date(this.results[i].date);
        newDate[i] = coverdate.getDate()+"/"+coverdate.getMonth()+"/"+coverdate.getFullYear();
      }
      return newDate;
    },
    filterResult: function () {
      if(this.searchV == null){
        return this.results;
      }else
      return this.results.filter(result => result.description.includes(this.searchV));
    }
  },
};

</script>
<style scoped>
#tdcontent {
  text-align: center;
}
#tddescription {
  max-width: 300px; 
  word-wrap: break-word;
}
tr:nth-child(even) {
  background-color: #ffcec8;
}
tr:nth-child(odd){
   background-color: #e8eaeb;
}
</style>