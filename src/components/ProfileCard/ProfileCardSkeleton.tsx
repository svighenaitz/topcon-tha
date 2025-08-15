import Skeleton from '@mui/material/Skeleton';
import ProfileCardContainer from './ProfileCardContainer';

export default function ProfileCardSkeleton() {
  const mediaContent = (
    <div
      style={{
        width: '100%',
        height: '100%',
        borderRadius: '8px',
        background: 'linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%)',
        backgroundSize: '200% 100%',
        animation: 'shimmer 1.5s infinite linear'
      }}
    />
  );

  const actionsContent = (
    <>
      <Skeleton variant="rectangular" width={80} height={36} />
      <Skeleton variant="rectangular" width={80} height={36} />
    </>
  );

  return (
    <ProfileCardContainer
      mediaContent={mediaContent}
      actionsContent={actionsContent}
      ariaLabel="profile-skeleton"
    >
      <Skeleton variant="text" width="60%" height={32} sx={{ mb: 1 }} />
      <Skeleton variant="text" width="80%" height={20} />
    </ProfileCardContainer>
  );
}
