import {
    Autocomplete,
    Button,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogProps,
    DialogTitle,
    TextField
} from '@mui/material';
import { useRef, useState } from 'react';
import * as S from './styles';

export default function UploadDilaog(props: DialogProps) {
    const inputFile = useRef<HTMLInputElement | null>(null);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [tags, setTags] = useState<string[]>([]);

    const onButtonClick = () => {
        // `current` points to the mounted file input element
        inputFile?.current?.click();
    };

    const handleClose = () => {
        if (props.onClose) {
            props.onClose({}, 'escapeKeyDown');
        }
    };

    const handleUploadButtonClick = () => {
        if (props.onClose) {
            props.onClose({}, 'escapeKeyDown');
        }
    };

    return (
        <Dialog {...props}>
            <DialogTitle>Upload</DialogTitle>
            <DialogContent>
                <S.UploadDialogContentDiv>
                    <Button onClick={onButtonClick}>Upload files...</Button>
                    <input
                        type="file"
                        id="file"
                        ref={inputFile}
                        style={{ display: 'none' }}
                        multiple
                        onChange={(e) => setSelectedFiles(Array.from(e.target.files as FileList))}
                    />
                    <div style={{ border: '1px solid gray', maxHeight: '400px' }}>
                        {selectedFiles.map((file, idx) => (
                            <div key={idx}>{file.name}</div>
                        ))}
                    </div>
                    <Autocomplete
                        multiple
                        id="tags-filled"
                        options={[]}
                        freeSolo
                        value={tags}
                        onChange={(e, v) => setTags(v)}
                        renderTags={(value, getTagProps) =>
                            value.map((option, index) => (
                                // eslint-disable-next-line react/jsx-key
                                <Chip
                                    variant="outlined"
                                    label={option}
                                    {...getTagProps({ index })}
                                />
                            ))
                        }
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="filled"
                                label="Tag"
                                placeholder="Input tag and press Enter"
                            />
                        )}
                    />
                </S.UploadDialogContentDiv>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button variant="contained" onClick={handleUploadButtonClick}>
                    Create
                </Button>
            </DialogActions>
        </Dialog>
    );
}
