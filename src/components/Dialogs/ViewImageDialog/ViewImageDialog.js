import React from 'react';
import PropTypes from 'prop-types';
import {Dialog} from '@material-ui/core';

function ViewImageDialog({
  image, open, handleClose,
}) {
  return (
    <Dialog
      open={open}
      handleClose={handleClose}>
      <img src={image} width="100%" alt='PhraseImage' />
    </Dialog>
  )
}

ViewImageDialog.propTypes = {
  image: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
}

export default ViewImageDialog;