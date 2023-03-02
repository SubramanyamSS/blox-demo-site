import React, { useState } from 'react';
import {
  Main,
  Redirect,
  Content,
  Wrapper,
  Segment,
  Container,
  SegmentList
} from './styled';
import { Label, Button, List, Form, Input } from 'semantic-ui-react';
import { SegmentsConsumer, SegmentsContainer } from "../../container";

const Segments = props => {
  return (
    <SegmentsContainer>
      <SegmentsConsumer>
        {context => {
          const list = context.list || [];
          return (
            <Main>
              <Container>
                <Wrapper>
                  <Content>
                    <SegmentList>
                      <Segment>
                        <p className="font-18 font-wt-600">Segments</p>
                        <List horizontal>
                          {list.map(segment => (
                            <List.Item key={segment.id}>
                              <Redirect to={`/segments/${encodeURIComponent(segment.name)}`}>
                                <div className="ui large">
                                  {segment.name}
                                </div>
                              </Redirect>
                            </List.Item>
                          ))
                          }
                        </List>
                      </Segment>
                    </SegmentList>
                  </Content>
                </Wrapper>
              </Container>
            </Main>
          );
        }}
      </SegmentsConsumer>
    </SegmentsContainer>
  );
};

export { Segments };
