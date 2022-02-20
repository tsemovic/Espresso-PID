import { createApp } from "vue";
import App from "./App.vue";
import { Quasar, Notify } from "quasar";
import quasarUserOptions from "./quasar-user-options";

import axios from "axios";

async function getSettings() {
  let res = await axios.get("/settings");
  return await res.data;
//   let json = {
//     "VUE_TITLE" : "GAGGIA CONTROLLER",
//     "VUE_COLOUR" : {"primary" : "#D0D9B0", "secondary" : "#403324", "accent" : "#736049", "info" : "#736049"},
//     "FLASK_IP" : "192.168.1.21",
//     "FLASK_PORT" : 80
// }
//   return json
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
            info: res.VUE_COLOUR.info
          }
        },
      },
      quasarUserOptions
    )
    .provide("settings", res)
    .mount("#app");
});
