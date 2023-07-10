import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));


// const firebaseConfig = {
//   apiKey: "AIzaSyDXcpYQ9XHpJSRyhhqJgRx4Mc99eh_MeLE",
//   authDomain: "helivox-2.firebaseapp.com",
//   databaseURL: "https://helivox-2-default-rtdb.firebaseio.com",
//   projectId: "helivox-2",
//   storageBucket: "helivox-2.appspot.com",
//   messagingSenderId: "582156179729",
//   appId: "1:582156179729:web:f8bdbbdc06d3e92f94d4b0",
//   measurementId: "G-NWGYBGTEWH"
// };


// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

