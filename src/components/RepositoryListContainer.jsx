import React from 'react';
import { FlatList, View, StyleSheet, Dimensions } from 'react-native';
import RepositoryItem from './RepositoryItem';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});
const ItemSeparator = () => <View style={styles.separator} />;

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const props = this.props;
    return props.children;
  };

  render() {
    const props = this.props;
    const { repositories, onEndReach } = props;

    // Get the nodes from the edges array
    const repositoryNodes = repositories
      ? repositories.edges.map((edge) => edge.node)
      : [];

    return (
      <FlatList
        testID="flat-list"
        data={repositoryNodes}
        keyExtractor={({ id }) => id}
        /*
          rendering : "renderItem={RepositoryItem}" causes a "hook error" when attempting to
          use "useHistory" in the RepositoryList FC
        */

        renderItem={({ item }) => <RepositoryItem repository={item} />}
        ItemSeparatorComponent={ItemSeparator}
        ListHeaderComponent={this.renderHeader}
        showsVerticalScrollIndicator={false}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
      />
    );
  }
}
