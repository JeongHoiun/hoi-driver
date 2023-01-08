import { styled, TextField, TextFieldProps, Typography } from '@mui/material';

const StyledTextField = styled(TextField)({
    width: '100%',
    marginTop: '4px'
});

export default function HoiTextField(props: TextFieldProps) {
    const { label, ...textFieldProps } = props;
    return (
        <div>
            <Typography variant="subtitle1">{label}</Typography>
            <StyledTextField style={{ width: '100%' }} {...textFieldProps} />
        </div>
    );
}
