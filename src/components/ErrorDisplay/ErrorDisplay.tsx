import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export interface ErrorDisplayProps {
  message: string;
  onRetry: () => void;
}

export default function ErrorDisplay({ message, onRetry }: ErrorDisplayProps) {
  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Alert severity="error" role="alert">
        {message}
      </Alert>
      <Button variant="outlined" onClick={onRetry} aria-label="retry">
        Retry
      </Button>
    </Stack>
  );
}

