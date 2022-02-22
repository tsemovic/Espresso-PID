import { createApp } from "vue";
import App from "./App.vue";
import { Quasar, Notify } from "quasar";
import quasarUserOptions from "./quasar-user-options";

import axios from "axios";

async function getSettings() {
  let res = await axios.get("/settings");
  return await res.data;
  // let json = {
  //   VUE_TITLE: "GAGGIA CONTROLLER",
  //   VUE_COLOUR: {
  //     primary: "#BF4B96",
  //     secondary: "#D98BBD",
  //     accent: "#D95448",
  //     dark: "#FFFF",
  //     positive: "#BDDD96",
  //     negative: "#ed1",
  //     info: "#000",
  //     warning: "#592D1D",
  //   },
  //   FLASK_IP: "0.0.0.0",
  //   FLASK_PORT: 80,
  // };

  return json;
}

getSettings().then((res) => {
  createApp(App)
    .use(
      Quasar,
      {
        plugins: {
          Notify,
        },
        config: {
          notify: {
            /* look at QuasarConfOptions from the API card */
          },
          brand: {
            primary: res.VUE_COLOUR.primary,
            secondary: res.VUE_COLOUR.secondary,
            accent: res.VUE_COLOUR.accent,
            dark: res.VUE_COLOUR.dark,
            positive: res.VUE_COLOUR.positive,
            negative: res.VUE_COLOUR.negative,
            info: res.VUE_COLOUR.info,
            warning: res.VUE_COLOUR.warning,
          },
        },
      },
      quasarUserOptions
    )
    .provide("settings", res)
    .mount("#app");
});
