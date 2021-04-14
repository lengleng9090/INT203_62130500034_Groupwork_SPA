<template>
    <header class="flex justify-between place-items-center">
        <div>
        <img src="../../public/img/iconlarge.png" width="400" class="image_full">
        <img src="../../public/img/icon.png" width="60" class="image_mobile">
        </div>
        <div class="space-x-10">
        <router-link to="/" class="inline-block">หน้าหลัก</router-link>
        <router-link to="/about" class="inline-block">เกี่ยวกับเรา</router-link>
        </div>
    </header>
</template>
<style scoped>
*{
    font-size: 22px;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    text-decoration: none;
    background-color:#00c33e;
    color: white;
}
header{
    padding: 10px 5%;
}
.image_full{
   display:block;
  }

 .image_mobile{
  display:none;
 }

@media (max-width: 1000px) and (min-width: 320px){
  .image_full{
   display:none;
  }

  .image_mobile{
   display:block;
  }
}
</style>