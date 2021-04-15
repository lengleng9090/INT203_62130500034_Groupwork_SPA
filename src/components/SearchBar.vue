<template>
    <div class="grid justify-items-stretch ...">
    <input type="text" v-on:input="$emit('searchValue', $event.target.value)" class="border border-black justify-self-center rounded-md p-1 m-3" placeholder="ค้นหารายการ..."/>
    </div>
</template>
<style scoped>
input{
    background-image: url("../../public/img/search.png");
    background-repeat: no-repeat;
    padding-right: 30px;
    background-size: 25px;
    background-position: right;
}
</style>