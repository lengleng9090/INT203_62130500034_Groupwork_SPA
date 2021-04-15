<template>
  <navigation-bar />
  <div class="flex justify-between">
    <div class="inline-block" />
    <div class="space-y-6 m-4 p-4 inline-block bg-blue-100 rounded">
      <h1 v-if="!isEdit" class="text-2xl">เพิ่มรายการใหม่</h1>
      <h1 v-else class="text-2xl">แก้ไขข้อมูล</h1>
      <table>
        <tr>
          <td>รายการ :</td>
          <td>
            <textarea
              class="p-1 h-20 border border-black rounded"
              spellcheck="false"
              placeholder="เพิ่มรายการใหม่"
              v-model="enteredDescription"
            />
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <sup v-show="unavailableDescription"
              >*โปรดเติมข้อความในช่องว่างให้เรียบร้อย</sup
            >
          </td>
        </tr>

        <tr>
          <td>รายรับ :</td>
          <td>
            <input
              type="number"
              class="border border-black rounded"
              v-model="enteredReceivable"
            />
          </td>
        </tr>

        <tr>
          <td colspan="2">
            <sup v-show="unavailableReceivable"
              >*โปรดระบุจำนวนเงินให้เรียบร้อย (หากไม่มีให้ใส่ 0)</sup
            >
          </td>
        </tr>

        <tr>
          <td>รายจ่าย :</td>
          <td>
            <input
              type="number"
              class="border border-black rounded"
              v-model="enteredPayable"
            />
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <sup v-show="unavailablePayable"
              >*โปรดระบุจำนวนเงินให้เรียบร้อย (หากไม่มีให้ใส่ 0)</sup
            >
          </td>
        </tr>

        <tr>
          <td>วัน/เดือน/ปี :</td>
          <td>
            <input
              class="border border-black rounded"
              type="date"
              v-model="enteredDate"
            />
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <sup v-show="unavailableDate"
              >*โปรดระบุ วัน/เดือน/ปี ให้เรียบร้อย</sup
            >
          </td>
        </tr>
      </table>
      <br />
      <button
        v-on:click="submitForm"
        style="background-color: #4caf50"
        class="rounded mr-4"
      >
        ยืนยัน
      </button>
      <button
        v-on:click="cancelEdit"
        v-show="isEdit"
        style="background-color: #ef3340"
        class="rounded"
      >
        ยกเลิก
      </button>
    </div>
    <div class="inline-block" />
  </div>
  <SearchBar @searchValue="useSearch" />

  <Table
    :results="results"
    :searchV="searchV"
    @oldRecord="showData"
    @deleteRecord="deleteData"
  />
</template>

<script>
import Table from "@/components/Table.vue";
import SearchBar from "@/components/SearchBar.vue";
export default {
  name: "Home",
  components: {
    Table,
    SearchBar,
  },
  data() {
    return {
      enteredDescription: "",
      enteredReceivable: null,
      enteredPayable: null,
      enteredDate: "",
      unavailableDescription: false,
      unavailableReceivable: false,
      unavailablePayable: false,
      unavailableDate: false,
      isEdit: false,
      editId: null,
      results: [],
      searchV: null,
    };
  },
  methods: {
    submitForm() {
      this.unavailableDescription =
        this.enteredDescription === "" ? true : false;
      this.unavailableReceivable =
        this.enteredReceivable === null || this.enteredReceivable === ""
          ? true
          : false;
      this.unavailablePayable =
        this.enteredPayable === null || this.enteredPayable === ""
          ? true
          : false;
      this.unavailableDate = this.enteredDate === "" ? true : false;
      if (
        this.unavailableDescription ||
        this.unavailableReceivable ||
        this.unavailablePayable ||
        this.unavailableDate
      ) {
        return;
      }
      this.enteredReceivable = parseInt(this.enteredReceivable);
      this.enteredPayable = parseInt(this.enteredPayable);
      if (this.isEdit === true) {
        this.editData({
          description: this.enteredDescription,
          receivable: this.enteredReceivable,
          payable: this.enteredPayable,
          date: this.enteredDate,
        });
      } else {
        this.postData({
          description: this.enteredDescription,
          receivable: this.enteredReceivable,
          payable: this.enteredPayable,
          date: this.enteredDate,
        });
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
    async postData(newRecord) {
      try {
        const response = await fetch("http://localhost:5000/Ledger", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            description: newRecord.description,
            receivable: newRecord.receivable,
            payable: newRecord.payable,
            date: newRecord.date,
          }),
        });
        const data = await response.json();
        this.results = [...this.results, data];
        this.enteredDescription = "";
        this.enteredReceivable = null;
        this.enteredPayable = null;
        this.enteredDate = "";
      } catch (error) {
        console.log(error);
      }
    },
    showData(oldRecord) {
      this.isEdit = true;
      this.editId = oldRecord.id;
      this.enteredDescription = oldRecord.description;
      this.enteredReceivable = oldRecord.receivable;
      this.enteredPayable = oldRecord.payable;
      this.enteredDate = oldRecord.date;
      this.unavailableDescription = false;
      this.unavailableReceivable = false;
      this.unavailablePayable = false;
      this.unavailableDate = false;
    },
    async editData(editRecord) {
      try {
        const response = await fetch(
          "http://localhost:5000/Ledger/" + this.editId,
          {
            method: "PUT",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({
              description: editRecord.description,
              receivable: editRecord.receivable,
              payable: editRecord.payable,
              date: editRecord.date,
            }),
          }
        );
        const data = await response.json();
        this.results = this.results.map((result) =>
          result.id === this.editId
            ? {
                ...result,
                description: data.description,
                receivable: data.receivable,
                payable: data.payable,
                date: data.date,
              }
            : result
        );
        this.isEdit = false;
        this.enteredDescription = "";
        this.enteredReceivable = null;
        this.enteredPayable = null;
        this.enteredDate = "";
        this.editId = "";
      } catch (error) {
        console.log(error);
      }
    },
    cancelEdit() {
      this.isEdit = false;
      this.enteredDescription = "";
      this.enteredReceivable = null;
      this.enteredPayable = null;
      this.enteredDate = "";
      this.editId = "";
    },
    async deleteData(deleteRecord) {
      try {
        await fetch("http://localhost:5000/Ledger/" + deleteRecord.id, {
          method: "DELETE",
        });
        this.results = this.results.filter(
          (result) => result.id !== deleteRecord.id
        );
      } catch (error) {
        console.log(error);
      }
    },
    useSearch(value) {
      this.searchV = value;
    },
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
button {
  color: white;
  padding: 5px 15px;
  text-align: center;
}
</style>

