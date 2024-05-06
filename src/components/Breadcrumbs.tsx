import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';

import { useStoreIssues } from '../store/issues-store';

export const Breadcrumbs = () => {
  const { path, ownerLink, repoLink } = useStoreIssues((state) => ({
    path: state.path,
    ownerLink: state.ownerLink,
    repoLink: state.repoLink,
  }));

 let ownerName, repoName;

 if (path) {
   const [owner, repo] = path.split('/');
    ownerName = owner;
    repoName = repo;
 }
   console.log(path);


  return (
    path &&
    <Breadcrumb
      color="blue.500"
      separator={<ChevronRightIcon color="blue.500" />}
    >
      <BreadcrumbItem>
        <BreadcrumbLink target="_blank" href={ownerLink}>
          {ownerName}
        </BreadcrumbLink>
      </BreadcrumbItem>

      <BreadcrumbItem>
        <BreadcrumbLink target="_blank" href={repoLink}>
          {repoName}
        </BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  );
};
