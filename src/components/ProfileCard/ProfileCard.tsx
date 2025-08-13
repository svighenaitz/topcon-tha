import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import type { Profile } from '../../types';

export interface ProfileCardProps {
  profile: Profile;
  onLike: () => void;
  onDislike: () => void;
}

export default function ProfileCard({ profile, onLike, onDislike }: ProfileCardProps) {
  return (
    <Card sx={{ maxWidth: 420 }} aria-label={`profile-${profile.id}`}>
      <CardMedia component="img" height="520" image={profile.photoUrl} alt={`${profile.name}'s photo`} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {profile.name}, {profile.age}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {profile.bio}
        </Typography>
      </CardContent>
      <CardActions>
        <Stack direction="row" spacing={2} sx={{ width: '100%', justifyContent: 'space-between' }}>
          <Button variant="outlined" color="inherit" onClick={onDislike} aria-label="dislike">
            Dislike
          </Button>
          <Button variant="contained" color="primary" onClick={onLike} aria-label="like">
            Like
          </Button>
        </Stack>
      </CardActions>
    </Card>
  );
}

