<template>
  <div>
    <div class="footer">
      <div class="d-flex justify-content-center">
        <a class="link" href="#">FAQ</a>
        <a class="link" href="">Terms of use</a>
        <a class="link" href="">Privacy policy</a>
        <a class="link" href="">Contact us</a>
      </div>
    </div>
    <div class="copyright"><p>Copyright CloudTravel 2021.</p></div>
  </div>
</template>
<script>
export default {
  name: "BottomFooter",
};
</script>
<style scoped>
.footer {
  background-color: #333333;
  height: 70px;
  padding-left: 10%;
  padding-right: 10%;
}
a {
  color: #fff !important;
  padding-right: 50px;

  position: relative;
  top: 30px;
  font-size: 14px;
  text-decoration: none;
  width: max-content;
}
.copyright {
  background-color: #000000;
  height: 50px;
}
.copyright p {
  position: relative;
  top: 20px;
  color: #fff;
  text-align: center;
  font-size: 12px;
}
</style>
