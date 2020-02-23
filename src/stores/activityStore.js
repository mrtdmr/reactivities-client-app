import { observable, action, computed, runInAction } from 'mobx';
import agent from '../api/agent';
import { history } from '../index';
import { toast } from 'react-toastify';
import { RootStore } from './rootStore';
import { setActivityProps, createAttendee } from '../utils/utils';

export default class ActivityStore {
  rootStore: RootStore;
  constructor(rootStore) {
    this.rootStore = rootStore;
  }
  @observable activityRegistry = new Map();
  @observable loadingInitial = false;
  @observable activity = null;
  @observable submitting = false;
  @observable target = '';
  @observable loading = false;

  @computed get activitiesByDate() {
    return this.groupActivitiesByDate(
      Array.from(this.activityRegistry.values())
    );
  }
  groupActivitiesByDate(activities: []) {
    const sortedActivities = activities.sort(
      (a, b) => Date.parse(a.date) - Date.parse(b.date)
    );
    return Object.entries(
      sortedActivities.reduce((activities, activity) => {
        const date = activity.date.split('T')[0];
        activities[date] = activities[date]
          ? [...activities[date], activity]
          : [activity];
        return activities;
      }, {})
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
          //activity.date = activity.date.split('.')[0];
          //this.activities.push(activity);
          setActivityProps(activity, this.rootStore.userStore.user);
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
    if (activity) {
      this.activity = activity;
      return activity;
    } else {
      this.loadingInitial = true;
      try {
        activity = await agent.Activities.details(id);
        runInAction('getting activity', () => {
          setActivityProps(activity, this.rootStore.userStore.user);
          this.activity = activity;
          this.activityRegistry.set(activity.id, activity);
          this.loadingInitial = false;
        });
        return activity;
      } catch (error) {
        runInAction('get activity error', () => {
          this.loadingInitial = false;
        });
        console.log(error);
      }
    }
  };
  @action clearActivity = () => {
    this.activity = null;
  };
  getActivity = id => {
    return this.activityRegistry.get(id);
  };
  @action createActivity = async activity => {
    this.submitting = true;
    try {
      await agent.Activities.create(activity);
      const attendee = createAttendee(this.rootStore.userStore.user);
      attendee.isHost = true;
      let attendees = [];
      attendees.push(attendee);
      activity.attendees = attendees;
      activity.isHost = true;
      runInAction('create activity', () => {
        this.activityRegistry.set(activity.id, activity);
        this.submitting = false;
      });
      history.push(`/activities/${activity.id}`);
    } catch (error) {
      runInAction('create activity error', () => {
        this.submitting = false;
      });
      toast.error('Problem submitting data');
      console.log(error.response);
    }
  };
  @action editActivity = async activity => {
    this.submitting = true;
    try {
      await agent.Activities.update(activity);
      runInAction('editing activity', () => {
        this.activityRegistry.set(activity.id, activity);
        this.activity = activity;
        this.submitting = false;
      });
      history.push(`/activities/${activity.id}`);
    } catch (error) {
      runInAction('edit activity error', () => {
        this.submitting = false;
      });
      toast.error('Problem submitting data');
      console.log(error.response);
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
  @action attendActivity = async () => {
    const attendee = createAttendee(this.rootStore.userStore.user);
    this.loading = true;
    try {
      await agent.Activities.attend(this.activity.id);
      runInAction(() => {
        if (this.activity) {
          this.activity.attendees.push(attendee);
          this.activity.isGoing = true;
          this.activityRegistry.set(this.activity.id, this.activity);
          this.loading = false;
        }
      });
    } catch (error) {
      runInAction(() => {
        this.loading = false;
      });
      toast.error('Problem signing up to activity');
    }
  };
  @action cancelAttendance = async () => {
    this.loading = true;
    try {
      await agent.Activities.unAttend(this.activity.id);
      runInAction(() => {
        if (this.activity) {
          this.activity.attendees = this.activity.attendees.filter(
            a => a.userName !== this.rootStore.userStore.user.userName
          );
          this.activity.isGoing = false;
          this.activityRegistry.set(this.activity.id, this.activity);
          this.loading = false;
        }
      });
    } catch (error) {
      runInAction(() => {
        this.loading = false;
      });
      toast.error('Problem cancelling attendance');
    }
  };
}
