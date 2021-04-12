<template>
  <navigation-bar />
  <div class="flex justify-between">
    <div class="inline-block"/>
    <form class="space-y-6 m-4 p-4 inline-block bg-blue-100 rounded">
      <h1>เพิ่มรายการใหม่</h1>
      <p>รายการ : <input type="text" class="border border-black rounded" /></p>
      <p>รายรับ : <input type="text" class="border border-black rounded" /></p>
      <p>รายจ่าย : <input type="text" class="border border-black rounded" /></p>
      <p>วัน/เดือน/ปี : <input class="bg-white rounded" type="date" /></p>
      <input type="submit" value="ยืนยัน" />
    </form>
    <div class="inline-block"/>
  </div>

  <Table :results="results" />
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
      results: [],
    };
  },
  methods: {
    async getData() {
      try {
        const response = await fetch("http://localhost:5000/Ledger");
        const data = await response.json();
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  },
  async created() {
    this.results = await this.getData();
  },
};
</script>

