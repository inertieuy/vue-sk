import { createApp } from "vue";
import App from "./App.vue";

import routes from "./routes/index.vue";

createApp(App).use(routes).mount("#app");
