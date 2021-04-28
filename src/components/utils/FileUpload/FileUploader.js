import React, { useCallback, useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useDropzone } from 'react-dropzone';
import AddFileImage from './add-file.svg';

const getColor = (props, theme) => {
  if (props.isDragAccept) {
    return theme.palette.success.main;
  }
  if (props.isDragReject) {
    return theme.palette.error.main;
  }
  if (props.isDragActive) {
    return theme.palette.primary.main;
  }
  return theme.palette.grey[300];
}

const useStyles = makeStyles(theme => ({
  dropzoneContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    padding: '20px',
    borderWidth: '2px',
    borderRadius: '2px',
    borderColor: props => getColor(props, theme),
    borderStyle: 'dashed',
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    outline: 'none',
    transition: 'border .24s ease-in-out',
    '&:hover': {
      cursor: 'pointer',
      opacity: 0.5,
    }
  },
  selectFileImage: {
    width: 130
  },
  thumbsContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16
  },
  thumbContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  thumb: {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box'
  },
  thumbInner: {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
  },
  img: {
    display: 'block',
    width: 'auto',
    height: '100%'
  }
}));

function FileUploader({ multiple, name, handleChange, accept }) {
  const [files, setFiles] = useState([]);
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);

      reader.addEventListener("load", () => {
        handleChange({
          target: {
            name: name,
            value: reader.result
          }
        });
      }, false);
    }
    setFiles(acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    })));
  }, [handleChange, name]);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    accept: accept,
    multiple: multiple,
    onDrop
  });
  const classes = useStyles({
    isDragActive, isDragAccept, isDragReject
  });

  const thumbs = files.map(file => (

    <div className={classes.thumbContainer}>
      {accept === 'audio/*' ? null : <div key={file.name} className={classes.thumb}>
        <div className={classes.thumbInner}>
          <img
            alt={''}
            src={file.preview}
            className={classes.img}
          />
        </div>
      </div>}
      <span>{file.path} - {Math.floor(parseInt(file.size, 10) / 1000)} KB</span>
    </div>
  ));

  useEffect(() => () => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  const selectMessage = multiple ? 'select_files' : 'select_file';

  return (
    <section className="container">
      <div {...getRootProps({ className: classes.dropzoneContainer })}>
        <input {...getInputProps()} />
        <div>
          <img
            className={classes.selectFileImage}
            alt={selectMessage}
            src={AddFileImage}
          />
        </div>
        <div>
          <Typography component="h4" variant="h4" color="textSecondary" gutterBottom>
            {selectMessage}
          </Typography>
          <Typography component="p" variant="body1" >
            select_file_desc
          </Typography>
        </div>
      </div>
      <aside className={classes.thumbsContainer}>
        {thumbs}
      </aside>
    </section>
  );
}

FileUploader.defaultProps = {
  accept: 'image/*',
  multiple: true
}

FileUploader.propTypes = {
};

export default FileUploader;
