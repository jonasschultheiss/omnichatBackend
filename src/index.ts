import { App } from './App';

const app = new App();
app.express.listen(3000, () => {
  console.log('server is running');
});
