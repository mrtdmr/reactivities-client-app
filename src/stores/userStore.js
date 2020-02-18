import { observable, computed, action, runInAction } from 'mobx';
import agent from '../api/agent';
import { RootStore } from './rootStore';
import { history } from '..';

export default class UserStore {
  rootStore: RootStore;
  constructor(rootStore) {
    this.rootStore = rootStore;
  }
  @observable user = null;
  @computed get isLoggedIn() {
    return !!this.user;
  }
  @action login = async values => {
    try {
      const user = await agent.User.login(values);
      runInAction(() => {
        this.user = user;
      });

      this.rootStore.commonStore.setToken(user.token);
      this.rootStore.modalStore.closeModal();
      history.push('/activities');
    } catch (error) {
      throw error;
    }
  };
  @action register = async values => {
    try {
      const user = await agent.User.register(values);
      this.rootStore.commonStore.setToken(user.token);
      this.rootStore.modalStore.closeModal();
      history.push('/activities');
    } catch (error) {
      throw error;
    }
  };
  @action logout = () => {
    this.rootStore.commonStore.setToken(null);
    localStorage.removeItem('jwt');
    this.user = null;
    history.push('/');
  };
  @action getUser = async () => {
    try {
      const user = await agent.User.current();
      runInAction(() => {
        this.user = user;
      });
    } catch (error) {
      console.log(error);
    }
  };
}
