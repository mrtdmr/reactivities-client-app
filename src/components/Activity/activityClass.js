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
    /*
    runInAction(() => {
      if (init && init.date) {
        init.time = init.date;
      }
      Object.assign(this, init);
    });
    */
    //toJS returns observable to plain javascript object. So no need to use RunInAction
    if (init && init.date) {
      init.time = init.date;
    }
    Object.assign(this, init);
  }
}
