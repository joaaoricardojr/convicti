<template>
    <div>
      <input v-model="email" type="email" placeholder="E-mail" @input="clearErrors" />
      <p v-if="emailError" style="color: red;">{{ emailError }}</p>
      <input v-model="password" type="password" placeholder="Password" @input="clearErrors" />
      <p v-if="passwordError" style="color: red;">{{ passwordError }}</p>
      <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>
      <button @click="login" :disabled="loading">
        <span v-if="loading">Carregando...</span>
        <span v-else>Login</span>
      </button>
    </div>
  </template>
  
  <script>
  import AuthService from '../services/auth.service';
  
  export default {
    beforeRouteEnter(to, from, next) {
      if (AuthService.isLoggedIn()) {
        next('/dashboard');
      } else {
        next();
      }
    },
    data() {
      return {
        email: '',
        password: '',
        emailError: '',
        passwordError: '',
        errorMessage: '',
        loading: false,
      };
    },
    methods: {
      login() {
        if (!this.email) {
          this.emailError = 'O e-mail é obrigatório.';
          return;
        }
        this.emailError = '';
  
        if (!this.validateEmail(this.email)) {
          this.emailError = 'Formato de email inválido.';
          return;
        }
        this.emailError = '';
  
        if (!this.password) {
          this.passwordError = 'A senha é obrigatória.';
          return;
        }
        this.passwordError = '';
  
        this.loading = true;
        AuthService.login(this.email, this.password)
          .then(() => {
            this.$router.push('/dashboard');
          })
          .catch((error) => {
            if (error.message === 'O e-mail é obrigatório.') {
              this.emailError = error.message;
            } else if (error.message === 'A senha é obrigatória.') {
              this.passwordError = error.message;
            } else {
              this.errorMessage = error.message || 'Erro ao fazer login. Tente novamente.';
            }
            this.password = '';
          })
          .finally(() => {
            this.loading = false;
          });
      },
      validateEmail(email) {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
      },
      clearErrors() {
        this.errorMessage = '';
        this.emailError = '';
        this.passwordError = '';
      },
    },
  };
  </script>