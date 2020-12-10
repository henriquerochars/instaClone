import React, { useState, useEffect } from 'react';
import { View, FlatList } from 'react-native';

import { Post, Header, Avatar, Name, PostImage, Description } from './styles'

const Feed = () => {
  const [feed, setFeed] = useState([])

  async function loadFeed() {
    const response = await fetch("http://127.0.0.1:3000/feed?_expand=author&_limit=5&_page=1")

    const data = await response.json()

    setFeed(data)
  }

  useEffect(() => {
    loadFeed()
  }, [])

  return (
  <View>
    <FlatList data={feed} 
    keyExtractor={post => String(post.id)}
    renderItem={({ item }) => (
      <Post>
        <Header>
          <Avatar source={{ uri: item.author.avatar }} />
          <Name>{item.author.name}</Name>
        </Header>

        <PostImage ratio={item.aspectRatio} source={{ uri: item.image }} />

        <Description>
          <Name>{item.author.name}</Name> {item.description}
        </Description>
      </Post>
    )}
    />
  </View>
  );
}

export default Feed;