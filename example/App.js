//@flow
import React, {Component} from 'react';
import {Alert, Button, StyleSheet, View} from 'react-native';
import GoogleFit, {DataType, FitnessOptions} from 'react-native-google-fitness';
import BasicHistoryApi from './BasicHistoryApi';

export default class App extends Component<{}> {

    createFitnessOptions() {
        return new FitnessOptions.Builder()
            .addDataType(DataType.TYPE_STEP_COUNT_DELTA, FitnessOptions.AccessType.ACCESS_READ)
            .addDataType(DataType.AGGREGATE_STEP_COUNT_DELTA, FitnessOptions.AccessType.ACCESS_READ)
            .build();
    }

    onRequestPermissions = async () => {
        const result = await GoogleFit.requestPermissions(this.createFitnessOptions());
        this.showAlert(result);
    };

    onDisconnect = async () => {
        await GoogleFit.disconnect();
        this.showAlert('Disconnected');
    };

    onHasPermissions = async () => {
        const result = await GoogleFit.hasPermissions(this.createFitnessOptions());
        this.showAlert(result.toString());
    };

    onInsert = async () => {
        await BasicHistoryApi.insertData();
        this.showAlert('Data inserted');
    };

    onRead = async () => {
        const result = await BasicHistoryApi.readHistoryData();
        console.log(result);
        this.showAlert('Success. See result in android log');
    };

    showAlert = (text: string) => {
        Alert.alert('Result', text,
            [{text: 'OK', onPress: () => console.log('OK Pressed')}],
            {cancelable: true},
        );
    };

    render() {
        return (
            <View style={styles.container}>
                <Button
                    title="Request Permissions"
                    onPress={this.onRequestPermissions}
                />

                <Button
                    title="Disconnect"
                    onPress={this.onDisconnect}
                />

                <Button
                    title="Has permissions"
                    onPress={this.onHasPermissions}
                />

                <Button
                    title="Insert data"
                    onPress={this.onInsert}
                />

                <Button
                    title="Read data"
                    onPress={this.onRead}
                />

                <Button
                    disabled
                    title="Update data"
                    onPress={() => {
                        // TODO
                    }}
                />

                <Button
                    disabled
                    title="Delete data"
                    onPress={() => {
                        // TODO
                    }}
                />

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30,
        justifyContent: 'space-around',
        alignItems: 'stretch',
        backgroundColor: '#F5FCFF',
    },
});
