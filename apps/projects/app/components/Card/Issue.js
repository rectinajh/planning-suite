import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import { Text, theme, Badge, Button, ContextMenu, ContextMenuItem } from '@aragon/ui'
import { formatDistance } from 'date-fns'

import { CheckButton } from '../Shared'


// TODO: @aragon/ui Table?
// TODO: connect real data

const ETADistance = date => formatDistance(new Date(date), new Date())

const dot = <span style={{ margin: '0px 10px' }}>&middot;</span>

const Issue = ({
  title,
  repo,
  number,
  labels,
  isSelected,
  onSelect,
  onSubmitWork,
  onRequestAssignment,
  onReviewApplication,
  onAllocateSingleBounty,
  balance,
  symbol,
  expLevel = 'Intermediate',
  dueDate = '02/02/2020',
  funded = 'Pending funding'
}) => (
  <StyledIssue>
    <CheckButton checked={isSelected} onChange={onSelect} />

    <IssueDesc>

      <div>
        <Text color={theme.textPrimary} size="xlarge">
          {title}
        </Text>

        {dot}

        <Text color={theme.textSecondary} size="large">
          {repo} #{number}
        </Text>
      </div>

      <IssueDetails>
        <Text size="small" color={theme.textTertiary}>
          { balance > 0 && <span>
            {expLevel}
            {dot}
            {ETADistance(dueDate)}
            {dot}
            {funded}
          </span>
          }
          { labels.totalCount ? (
            labels.edges.map(label =>
              <Badge
                key={label.node.id}
                style={{ marginLeft: '15px'}}
                background={'#'+label.node.color}
                foreground={'#000'}>{label.node.name}
              </Badge>
            )) : ''
          }        
        </Text>
      </IssueDetails>
    </IssueDesc>

    <BalanceAndContext>
      { balance > 0 &&  
        <Badge
          style={{padding: '10px', marginRight: '20px', textSize: 'large'}}
          background={'#e7f8ec'}
          foreground={theme.positive}>{balance + ' ' + symbol}
        </Badge>
      }
      <ContextMenu>
        <ContextMenuItem onClick={onAllocateSingleBounty}>
          <ActionLabel>Allocate Bounty</ActionLabel>
        </ContextMenuItem>
        <ContextMenuItem onClick={onSubmitWork}>
          <ActionLabel>Submit Work</ActionLabel>
        </ContextMenuItem>
        <ContextMenuItem onClick={onRequestAssignment}>
          <ActionLabel>Request Assignment</ActionLabel>
        </ContextMenuItem>
        <ContextMenuItem onClick={onReviewApplication}>
          <ActionLabel>Review Application</ActionLabel>
        </ContextMenuItem>
      </ContextMenu>
    </BalanceAndContext>
  </StyledIssue>
)

Issue.propTypes = {
  title: PropTypes.string.isRequired,
  repo: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  isSelected: PropTypes.bool,
  onSelect: PropTypes.func,
}

const ActionLabel = styled.span`
  margin-left: 15px;
`
const StyledIssue = styled.div`
  //overflow-y: hidden;
  flex: 1;
  width: 100%;
  background: ${theme.contentBackground};
  display: flex;
  padding-left: 10px;
  height: 112px;
  align-items: center;
  border-radius: 3px;
  border: 1px solid ${theme.contentBorder};
  position: relative;
  > :first-child {
    margin-right: 21.5px;
    justify-content: center;
  }
  > :nth-child(2) {
    height: 100%;
    padding: 10px;
    flex: 1 1 auto;
  }
`
const IssueDetails = styled.div`
  display: flex;
`
const IssueDesc = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 90px;
`
const BalanceAndContext = styled.div`
  margin-right: 20px;
  display: inline-flex;
`



export default Issue
