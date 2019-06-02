import { App } from './App';

const app = new App();
app.express.listen(3132, () => {
  console.log('server is running');
});
