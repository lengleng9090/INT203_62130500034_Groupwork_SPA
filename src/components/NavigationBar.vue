<template>
    <header class="flex justify-between place-items-center">
        <div>
        <img class="logo" src="../../public/img/icon.png" width="75">
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
</style>