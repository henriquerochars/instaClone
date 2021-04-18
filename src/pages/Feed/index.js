import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList } from 'react-native';

import LazyImage from '../../components/LazyImage';

import { loadPage } from '../../service/api';

import { Post, Header, Avatar, Name, Description, Loading } from './styles';

const Feed = () => {
  const [feed, setFeed] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [viewable, setViewable] = useState([]);

  useEffect(() => {
    loadPage(page, false, total, setLoading, setTotal, setFeed, setPage, feed);
  }, []);

  async function refreshList() {
    setRefreshing(true);
    await loadPage(
      1,
      true,
      total,
      setLoading,
      setTotal,
      setFeed,
      setPage,
      feed
    );
    setRefreshing(false);
  }

  const handleViewableChanged = useCallback(({ changed }) => {
    setViewable(changed.map(({ item }) => item.id));
  }, []);

  return (
    <View>
      <FlatList
        data={feed}
        keyExtractor={(post) => String(post.id)}
        onEndReached={() =>
          loadPage(
            page,
            false,
            total,
            setLoading,
            setTotal,
            setFeed,
            setPage,
            feed
          )
        }
        onEndReachedThreshold={0.1}
        ListFooterComponent={loading && <Loading />}
        onViewableItemsChanged={handleViewableChanged}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 10 }}
        onRefresh={refreshList}
        refreshing={refreshing}
        renderItem={({ item }) => (
          <Post>
            <Header>
              <Avatar source={{ uri: item.author.avatar }} />
              <Name>{item.author.name}</Name>
            </Header>

            <LazyImage
              shouldLoad={viewable.includes(item.id)}
              aspectRatio={item.aspectRatio}
              smallSource={{ uri: item.small }}
              source={{ uri: item.image }}
            />

            <Description>
              <Name>{item.author.name}</Name> {item.description}
            </Description>
          </Post>
        )}
      />
    </View>
  );
};

export default Feed;
