import {
    Autocomplete,
    Button,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogProps,
    DialogTitle,
    ListItem,
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
                    <S.UploadDialogButton variant="contained" onClick={onButtonClick}>
                        Upload files...
                    </S.UploadDialogButton>
                    <input
                        type="file"
                        id="file"
                        ref={inputFile}
                        style={{ display: 'none' }}
                        multiple
                        onChange={(e) => setSelectedFiles(Array.from(e.target.files as FileList))}
                    />
                    {selectedFiles && (
                        <S.SelectedFileList>
                            {selectedFiles.map((file, idx) => (
                                <ListItem key={idx}>{file.name}</ListItem>
                            ))}
                        </S.SelectedFileList>
                    )}
                    <Autocomplete
                        multiple
                        id="tags-filled"
                        options={[]}
                        freeSolo
                        limitTags={5}
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
                                variant="outlined"
                                label="Tags"
                                maxRows={3}
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
