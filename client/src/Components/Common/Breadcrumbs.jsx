import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import StructuredData from '../SEO/StructuredData';
import { getBreadcrumbData } from '../../utils/seoUtils';

const BreadcrumbContainer = styled.nav`
  display: flex;
  align-items: center;
  padding: 1rem 0;
  margin-bottom: 1rem;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.text};
  opacity: 0.8;
`;

const BreadcrumbList = styled.ol`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 0;
  margin: 0;
  list-style: none;
`;

const BreadcrumbItem = styled.li`
  display: flex;
  align-items: center;
  
  &:not(:last-child)::after {
    content: '/';
    margin: 0 0.5rem;
    color: ${({ theme }) => theme.text};
    opacity: 0.5;
  }
`;

const BreadcrumbLink = styled(Link)`
  color: ${({ theme }) => theme.text};
  text-decoration: none;
  transition: color 0.2s ease;
  
  &:hover {
    color: #6C63FF;
    text-decoration: underline;
  }
`;

const CurrentPage = styled.span`
  color: #6C63FF;
  font-weight: 500;
`;

/**
 * Breadcrumbs Component - Displays and structures breadcrumb navigation
 * 
 * @param {Object} props
 * @param {Object[]} props.customCrumbs - Optional custom breadcrumb items
 * @param {boolean} props.includeSchema - Whether to include structured data
 */
const Breadcrumbs = ({ customCrumbs, includeSchema = true }) => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);
  
  // Generate breadcrumb items based on current path
  const generateBreadcrumbs = () => {
    // If custom breadcrumbs are provided, use those
    if (customCrumbs) {
      return customCrumbs;
    }
    
    // Otherwise generate from current path
    const crumbs = [{ name: 'Home', path: '/' }];
    
    // Build up breadcrumb items based on URL segments
    let currentPath = '';
    
    pathnames.forEach((segment, index) => {
      currentPath += `/${segment}`;
      
      // Format the segment for display (capitalize, replace hyphens with spaces)
      const name = segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      crumbs.push({
        name,
        path: currentPath,
        isLast: index === pathnames.length - 1
      });
    });
    
    return crumbs;
  };
  
  const breadcrumbs = generateBreadcrumbs();
  
  // Prepare data for structured data
  const schemaItems = breadcrumbs.map(crumb => ({
    name: crumb.name,
    url: `https://webvitels.com${crumb.path}`
  }));
  
  return (
    <>
      {includeSchema && (
        <StructuredData type="BreadcrumbList" data={getBreadcrumbData(schemaItems)} />
      )}
      
      <BreadcrumbContainer aria-label="Breadcrumb">
        <BreadcrumbList>
          {breadcrumbs.map((crumb, index) => (
            <BreadcrumbItem key={index}>
              {crumb.isLast ? (
                <CurrentPage>{crumb.name}</CurrentPage>
              ) : (
                <BreadcrumbLink to={crumb.path}>{crumb.name}</BreadcrumbLink>
              )}
            </BreadcrumbItem>
          ))}
        </BreadcrumbList>
      </BreadcrumbContainer>
    </>
  );
};

export default Breadcrumbs;
