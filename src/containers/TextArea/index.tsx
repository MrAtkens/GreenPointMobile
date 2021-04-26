import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { t } from 'react-native-tailwindcss';

export default function TextArea(props : any) {
    return (
        <View style={styles.wrapper}>
            <TextInput
                multiline={true}
                editable
                numberOfLines={10}
                maxLength={150}
                {...props}
                style={[styles.input, props.error && t.borderRed500, props.style]}
            />
            {props.errorText && (
                <Text style={styles.errorText}>{props.errorText}</Text>
            )}
        </View>
    );
}

const styles = {
    wrapper: [t.selfStretch, t.mB5],
    input: [
        t.h11,
        t.border,
        t.selfStretch,
        t.p2,
        t.borderGray500,
        t.rounded,
        t.textBase,
        t.textGray700
    ],
    errorText: [t.mT1, t.textRed500]
};
