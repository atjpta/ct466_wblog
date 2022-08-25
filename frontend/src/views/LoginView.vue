<template>
  <div class="bg-gray-100/30  min-w-ax max-w-3xl rounded-3xl p-10 mt-16 mx-auto text-lg">
    <n-tabs default-value="login" justify-content="space-evenly" type="line" size="large">
      <n-tab-pane name="login" tab="Đăng nhập">
        <VLogin />
      </n-tab-pane>
      <n-tab-pane name="registration" tab="Đăng kí">
        <VRegistration />
      </n-tab-pane>
      
    </n-tabs>
  </div>
  
</template>

<script setup>
    import VRegistration from '@/components/vRegistrationForm.vue';
    import VLogin from '@/components/vLoginForm.vue';

</script>
