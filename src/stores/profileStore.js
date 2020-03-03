import { RootStore } from './rootStore';
import { observable, action, runInAction, computed, reaction } from 'mobx';
import agent from '../api/agent';
import { toast } from 'react-toastify';

export default class ProfileStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    reaction(
      () => this.activeTab,
      activeTab => {
        if (activeTab === 3 || activeTab === 4) {
          const predicate = activeTab === 3 ? 'followers' : 'following';
          this.loadFollowings(predicate);
        } else {
          this.followings = [];
        }
      }
    );
  }
  @observable profile = {};
  @observable loadingProfile = true;
  @observable uploadingPhoto = false;
  @observable loading = false;
  @observable followings = [];
  @observable activeTab = 0;
  @observable userActivities = [];
  @observable loadingActivities = false;

  @computed get isCurrentUser() {
    if (this.rootStore.userStore.user && this.profile)
      return this.rootStore.userStore.user.userName === this.profile.userName;
    else return false;
  }
  @action loadProfile = async username => {
    this.loadingProfile = true;
    try {
      const profile = await agent.Profiles.get(username);
      runInAction(() => {
        this.profile = profile;
        this.loadingProfile = false;
      });
    } catch (error) {
      runInAction(() => {
        this.loadingProfile = false;
      });
      console.log(error);
    }
  };
  @action uploadPhoto = async file => {
    this.uploadingPhoto = true;
    try {
      const photo = await agent.Profiles.uploadPhoto(file);
      runInAction(() => {
        if (this.profile) {
          this.profile.photos.push(photo);
          if (photo.isMain && this.rootStore.userStore.user) {
            this.rootStore.userStore.user.image = photo.url;
            this.profile.image = photo.url;
          }
        }
        this.uploadingPhoto = false;
      });
    } catch (error) {
      console.log(error);
      toast.error('Problem setting main photo');
      runInAction(() => {
        this.uploadingPhoto = false;
      });
    }
  };
  @action setMainPhoto = async photo => {
    this.loading = true;
    try {
      await agent.Profiles.setMainPhoto(photo.id);
      runInAction(() => {
        this.rootStore.userStore.user.image = photo.url;
        this.profile.photos.find(a => a.isMain).isMain = false;
        this.profile.photos.find(a => a.id === photo.id).isMain = true;
        this.profile.image = photo.url;
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      toast.error('Problem uploading photo');
      runInAction(() => {
        this.loading = false;
      });
    }
  };
  @action deletePhoto = async photo => {
    this.loading = true;
    try {
      await agent.Profiles.deletePhoto(photo.id);
      runInAction(() => {
        this.profile.photos = this.profile.photos.filter(
          p => p.id !== photo.id
        );
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      toast.error('Problem deleting photo');
      runInAction(() => {
        this.loading = false;
      });
    }
  };
  @action follow = async username => {
    this.loading = true;
    try {
      await agent.Profiles.follow(username);
      runInAction(() => {
        this.profile.following = true;
        this.profile.followersCount++;
        this.loading = false;
      });
    } catch (error) {
      toast.error('Problem following user');
      runInAction(() => {
        this.loading = false;
      });
    }
  };
  @action unFollow = async username => {
    this.loading = true;
    try {
      await agent.Profiles.unFollow(username);
      runInAction(() => {
        this.profile.following = false;
        this.profile.followersCount--;
        this.loading = false;
      });
    } catch (error) {
      toast.error('Problem unfollowing user');
      runInAction(() => {
        this.loading = false;
      });
    }
  };
  @action loadFollowings = async predicate => {
    this.loading = true;
    try {
      const profiles = await agent.Profiles.listFollowings(
        this.profile.userName,
        predicate
      );
      runInAction(() => {
        this.followings = profiles;
        this.loading = false;
      });
    } catch (error) {
      toast.error('Problem loading followings.');
      runInAction(() => {
        this.loading = false;
      });
    }
  };
  @action setActiveTab = activeIndex => {
    this.activeTab = activeIndex;
  };
  @action loadUserActivities = async (userName, predicate) => {
    this.loadingActivities = true;
    try {
      const activities = await agent.Profiles.listActivities(
        userName,
        predicate
      );
      runInAction(() => {
        this.userActivities = activities;
        this.loadingActivities = false;
      });
    } catch (error) {
      toast.error('Problem loading activities.');
      runInAction(() => {
        this.loadingActivities = false;
      });
    }
  };
}
