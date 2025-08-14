import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import type { Profile } from '../../types';

export interface ProfileCardProps {
  profile: Profile;
  onLike: () => void;
  onDislike: () => void;
  isMatch?: boolean;
  onOkay?: () => void;
}

export default function ProfileCard({ profile, onLike, onDislike, isMatch = false, onOkay }: ProfileCardProps) {
  const handleLikeClick = () => {
    if (isMatch && onOkay) {
      onOkay();
    } else {
      onLike();
    }
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <Card sx={{ maxWidth: 420 }} aria-label={`profile-${profile.id}`}>
        <CardMedia component="img" height="520" width={420} image={profile.photoUrl} alt={`${profile.name}'s photo`} />
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
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handleLikeClick} 
              aria-label={isMatch ? 'okay' : 'like'}
              sx={{ zIndex: 2 }}
            >
              {isMatch ? 'Okay' : 'Like'}
            </Button>
          </Stack>
        </CardActions>
      </Card>
      
      {isMatch && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 1,
            zIndex: 1,
          }}
        >
          <Typography 
            variant="h4" 
            component="div" 
            sx={{ 
              color: 'white', 
              textAlign: 'center',
              fontWeight: 'bold',
              mb: 2
            }}
          >
            You got a match!
          </Typography>
        </Box>
      )}
    </Box>
  );
}

