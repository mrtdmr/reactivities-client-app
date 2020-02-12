import { observable, action, computed, configure, runInAction } from 'mobx';
import { createContext } from 'react';
import agent from '../api/agent';

configure({ enforceActions: 'always' });
class ActivityStore {
  @observable activityRegistry = new Map();
  @observable activities: [] = [];
  @observable loadingInitial = false;
  @observable activity = undefined;
  @observable editMode = false;
  @observable submitting = false;
  @observable target = '';

  @computed get activitiesByDate() {
    return Array.from(this.activityRegistry.values()).sort(
      (a, b) => Date.parse(a.date) - Date.parse(b.date)
    );
  }
  /* With Promise
  @action loadActivities = () => {
    this.loadingInitial = true;
    agent.Activities.list()
      .then(activities => {
        activities.forEach(activity => {
          activity.date = activity.date.split('.')[0];
          this.activities.push(activity);
        });
      })
      .catch(error => console.log(error))
      .finally(() => (this.loadingInitial = false));
  };
  */
  //With async-await
  @action loadActivities = async () => {
    this.loadingInitial = true;
    try {
      const activities = await agent.Activities.list();
      runInAction('loading activities', () => {
        activities.forEach(activity => {
          activity.date = activity.date.split('.')[0];
          //this.activities.push(activity);
          this.activityRegistry.set(activity.id, activity);
        });
        this.loadingInitial = false;
      });
    } catch (error) {
      runInAction('load activities error', () => {
        this.loadingInitial = false;
      });
      console.log(error);
    }
  };

  @action loadActivity = async id => {
    let activity = this.getActivity(id);
    if (activity) this.activity = activity;
    else {
      this.loadingInitial = true;
      try {
        activity = await agent.Activities.details(id);
        runInAction('getting activity', () => {
          this.activity = activity;
          this.loadingInitial = false;
        });
      } catch (error) {
        runInAction('get activity error', () => {
          this.loadingInitial = false;
        });
        console.log(error);
      }
    }
  };

  getActivity = id => {
    return this.activityRegistry.get(id);
  };

  @action createActivity = async activity => {
    this.submitting = true;
    try {
      await agent.Activities.create(activity);
      //this.activities.push(activity);
      runInAction('creating activity', () => {
        this.activityRegistry.set(activity.id, activity);
        this.editMode = false;
        this.submitting = false;
      });
    } catch (error) {
      runInAction('create activity', () => {
        this.submitting = false;
      });
      console.log(error);
    }
  };

  @action openCreateForm = () => {
    this.editMode = true;
    this.activity = undefined;
  };

  @action selectActivity = id => {
    //this.activity = this.activities.find(a => a.id === id);
    this.activity = this.activityRegistry.get(id);
    this.editMode = false;
  };

  @action editActivity = async activity => {
    this.submitting = true;
    try {
      await agent.Activities.update(activity);
      runInAction('editing activity', () => {
        this.activityRegistry.set(activity.id, activity);
        this.activity = activity;
        this.editMode = false;
        this.submitting = false;
      });
    } catch (error) {
      runInAction('edit activity error', () => {
        this.submitting = false;
      });
      console.log(error);
    }
  };

  @action deleteActivity = async (event, id) => {
    this.submitting = true;
    this.target = event.currentTarget.name;
    try {
      await agent.Activities.delete(id);
      runInAction('deleting activity', () => {
        this.activityRegistry.delete(id);
        this.submitting = false;
        this.target = '';
      });
    } catch (error) {
      runInAction('delete activity error', () => {
        this.submitting = false;
        this.target = '';
      });
      console.log(error);
    }
  };

  @action openEditForm = id => {
    this.activity = this.activityRegistry.get(id);
    this.editMode = true;
  };
  @action cancelSelectedActivity = () => {
    this.activity = undefined;
  };
  @action cancelFormOpen = () => {
    this.editMode = false;
  };
}
export default createContext(new ActivityStore());
