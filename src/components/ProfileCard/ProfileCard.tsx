import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import type { Profile } from '../../types';
import ProfileCardContainer from './ProfileCardContainer';

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

  const mediaContent = (
    <img 
      src={profile.photoUrl} 
      alt={`${profile.name}'s`}
      style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
    />
  );

  const actionsContent = (
    <>
      <Button variant="outlined" color="inherit" onClick={onDislike} aria-label="dislike" data-testid="dislike-button">
        Dislike
      </Button>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleLikeClick} 
        aria-label={isMatch ? 'okay' : 'like'}
        data-testid={isMatch ? 'okay-button' : 'like-button'}
        sx={{ zIndex: 2 }}
      >
        {isMatch ? 'Okay' : 'Like'}
      </Button>
    </>
  );

  return (
    <ProfileCardContainer
      mediaContent={mediaContent}
      actionsContent={actionsContent}
      ariaLabel={`profile-${profile.id}`}
      data-testid="profile-card"
    >
      <Typography gutterBottom variant="h5" component="div" data-testid="profile-name">
        {profile.name}, <span data-testid="profile-age">{profile.age}</span>
      </Typography>
      <Typography variant="body2" color="text.secondary" data-testid="profile-bio">
        {profile.bio}
      </Typography>
      
      {isMatch && (
        <Box
          data-testid="match-notification"
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
            It's a match!
          </Typography>
        </Box>
      )}
    </ProfileCardContainer>
  );
}

