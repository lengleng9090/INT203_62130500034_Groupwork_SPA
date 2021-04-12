<template>
  <table class="table-fixed mx-auto p-5">
    <thead>
      <tr>
        <th class="w-1/2 ...">รายการ</th>
        <th class="w-1/6 ...">รายรับ</th>
        <th class="w-1/6 ...">รายจ่าย</th>
        <th class="w-1/6 ...">วัน/เดือน/ปี</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="result in results" :key="result.id">
        <td class="space-x-3">
          <button>
            <img
              src="../../public/img/unchecked.png"
              width="20"
              class="inline-block"
            />
          </button>
          <button>
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
        <td id="tdcontent">{{ result.date }}</td>
      </tr>
      <tr>
        <td style="text-align: center">ทั้งหมด</td>
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
  },
  data() {
    return {

    };
  },
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
  },
};

</script>
<style scoped>
#tdcontent {
  text-align: center;
}
tr:nth-child(even) {
  background-color: #ffb7af;
}
</style>