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
import { uploadFiles } from '../../aws/uploadFiles';
import * as S from './styles';
import { useSaveFile } from '../../queries/files';

interface Props {
    boardId: string;
}

export default function UploadDilaog(props: DialogProps & Props) {
    const { boardId, ...dialogProps } = props;
    const inputFile = useRef<HTMLInputElement | null>(null);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [tags, setTags] = useState<string[]>([]);
    const { mutate } = useSaveFile();

    const onButtonClick = () => {
        // `current` points to the mounted file input element
        inputFile?.current?.click();
    };

    const handleClose = () => {
        if (dialogProps.onClose) {
            dialogProps.onClose({}, 'escapeKeyDown');
        }
    };

    const handleUploadButtonClick = async () => {
        if (dialogProps.onClose) {
            await uploadFiles(selectedFiles, boardId);
            mutate({ fileName: selectedFiles[0].name, boardId: +boardId });
            dialogProps.onClose({}, 'escapeKeyDown');
        }
    };

    return (
        <Dialog {...dialogProps}>
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
                    Upload
                </Button>
            </DialogActions>
        </Dialog>
    );
}
