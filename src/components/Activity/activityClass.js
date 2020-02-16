import { runInAction } from 'mobx';

export class activityClass {
  id: '';
  title: '';
  category: '';
  description: '';
  date: '';
  time: '';
  city: '';
  venue: '';
  constructor(init) {
    runInAction(() => {
      if (init && init.date) {
        init.time = init.date;
      }
      Object.assign(this, init);
    });
  }
}
