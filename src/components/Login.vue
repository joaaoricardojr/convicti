<template>
  <div>
    <input type="text" v-model="username" placeholder="Nome de usuário" />
    <input type="password" v-model="password" placeholder="Senha" />
    <button @click="login">Login</button>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import AuthService from '@/services/auth.service.js';

export default {
  data() {
    return {
      username: '',
      password: '',
      error: null,
    };
  },
  methods: {
    login() {
      AuthService.login(this.username, this.password)
        .then(() => {
          this.error = 'Login realizado com sucesso!';
        })
        .catch((error) => {
          this.error = 'Erro ao fazer login. Verifique suas credenciais.';
          console.error(error);
        });
    },
  },
};
</script>