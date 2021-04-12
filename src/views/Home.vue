<template>
  <navigation-bar />
  <div class="flex justify-between">
    <Form/>
  </div>
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
      <tr>
        <td class="space-x-3">
          <button>
          <img src="../../public/img/unchecked.png" width="20" class="inline-block"> 
          </button>
          <button>
          <img src="../../public/img/edit.png" width="20" class="inline-block"> 
          </button>
          to CSS
          </td>
        <td id="tdcontent">Adam</td>
        <td id="tdcontent">858</td>
        <td id="tdcontent"></td>
      </tr>
      <tr class="bg-red-200">
        <td class="space-x-3">
          <button>
          <img src="../../public/img/unchecked.png" width="20" class="inline-block"> 
          </button>
          <button>
          <img src="../../public/img/edit.png" width="20" class="inline-block"> 
          </button>
          A Long and Winding Tour of the History of UI Frameworks and Tools and
          the Impact on Design
        </td>
        <td id="tdcontent">-</td>
        <td id="tdcontent">200</td>
        <td id="tdcontent"></td>
      </tr>
    </tbody>
  </table>
</template>

<script>
// @ is an alias to /src
import Form from '@/components/Form.vue'

export default {
  name: "Home",
  components: {
    Form
  },
};
</script>
<style scoped>
#tdcontent {
  text-align: center;
}
</style>
