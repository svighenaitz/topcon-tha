import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export interface MatchModalProps  {
  open: boolean;
  onClose: () => void;
};

export default function MatchModal({ open, onClose }: MatchModalProps) {
  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="match-title">
      <DialogTitle id="match-title">It's a match!</DialogTitle>
      <DialogContent>
        <Typography>You both like each other. Start a conversation!</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} autoFocus> {/* eslint-disable-line jsx-a11y/no-autofocus */}
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

