import React from 'react';
import AskModal from "../common/AskModal";

const AskRemoveModal = ({visible, onConfirm, onCancel}) => {
    return <AskModal
        visible={visible}
        title={'포스트 삭제'}
        description={'정말 포스틀 삭제하시겠습니까?'}
        confirmText={'삭제'}
        onConfirm={onConfirm}
        onCancel={onCancel}
    />
};

export default AskRemoveModal;
