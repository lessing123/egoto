import { registerRootComponent } from "expo";
import App from "./App";

// registerRootComponent s'assure que peu importe si vous lancez l'app sur
// Expo Go, en natif ou sur le Web, le composant principal est correctement monté.
registerRootComponent(App);
