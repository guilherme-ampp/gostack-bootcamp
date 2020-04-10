import React, { useEffect, useState } from 'react';
import { SafeAreaView, FlatList, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';

import api from '../services/api'

// return an empty <View /> - like an empty <div>
export default function App() {
    // always initialize the state with the same type that we will use afterwards
    const [ projects, setProjects ] = useState([]);

    useEffect(()  => {
        api.get('projects').then(response => {
            console.log(response.data);
            setProjects(response.data);
        })
    }, []);

    async function handleAddProject() {
        const response = await api.post('projects', {
            title: `New project ${Date.now()}`,
            owner: 'Guilherme de Almeida'
        })

        setProjects([...projects, response.data]);
    }

    // all elements in react native have "display: flex"
    return (
        // use a fragment - that will not generate any visual representation
        // this is just a wrapper to comply to the JSX syntax
        // [reminder] multi-line JSX must go into ()
        // [note] FlatList is a component that delivers a better performant 
        //        list view - no visual differences, but delivers better performance for 
        //        big lists - it does not render on screen items that are not visible outside the screen
        // [note] { item: project } -> this is simply a deconstruction of an object
        //                             renaming the 'item' variable into a 'project' variable
        // SafeAreaView - represents only the visible area on the device
        //                always remember to apply style to it with "flex: 1" to
        //                fill out the whole screen
        <>
        <StatusBar barStyle='light-content' backgroundColor="#7159C1"/>

        <SafeAreaView style={styles.container}>
            <FlatList 
                data={projects}
                keyExtractor={k => k.id}
                renderItem={({ item: project }) => (
                    <Text style={styles.project}>
                        {project.title}
                    </Text>
                )}>
            </FlatList>

            <TouchableOpacity onPress={handleAddProject} 
                              activeOpacity={0.6} 
                              style={styles.button}
            >
                <Text style={styles.buttonText}>Add new project</Text>
            </TouchableOpacity>
        </SafeAreaView>
        </>
    );
}

// we will not create CSS files
// styles are done with JavaScript code as follows:
const styles = StyleSheet.create({
    container: {
        // press Cmd + Space to explore the options for style
        // they are all just like CSS but in camelCase instead of kebab-case
        backgroundColor: '#7159C1',
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    project: {
        color: '#FFF',
        fontSize: 17,
    },
    button: {
        backgroundColor: '#FFF',
        margin: 20,
        height: 50,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 16
    }
});