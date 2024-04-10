import { Skeleton, SkeletonText, Stack, VStack } from "@chakra-ui/react";

const PageSkeleton = () => {
  return (
    <Stack gap={4}>
      <Skeleton height={6} />

      <Skeleton height={40} maxWidth="50%" />

      <SkeletonText noOfLines={16} spacing={4} skeletonHeight={4} />
    </Stack>
  );
};

export default PageSkeleton;
