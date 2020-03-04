import React, { useContext } from 'react';
import { Modal, Button } from 'semantic-ui-react';
import { RootStoreContext } from '../../../stores/rootStore';
import { observer } from 'mobx-react-lite';

const ModalContainer = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    modal: { open, body },
    closeModal
  } = rootStore.modalStore;
  return (
    <Modal open={open} closeOnDimmerClick={false} size='mini'>
      <Modal.Content>{body}</Modal.Content>
      <Modal.Actions>
        <Button onClick={closeModal} negative>
          Cancel
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default observer(ModalContainer);
