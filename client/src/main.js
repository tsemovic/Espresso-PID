import { createApp } from "vue";
import App from "./App.vue";
import { Quasar, Notify } from "quasar";
import quasarUserOptions from "./quasar-user-options";

import axios from "axios";

async function getSettings() {
  let res = await axios.get("/settings");
  return await res.data;
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
        },
      },
      quasarUserOptions
    )
    .provide("settings", res)
    .mount("#app");
});
