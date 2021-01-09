import { Field } from 'formik';
import React from 'react';
import ConfigForm from '../ConfigForm';

export default function AutoRefresh() {
    return (
        <>
            <h1>hello I am autoRefresh</h1>
            <ConfigForm shape={{ autoRefresh: false }}>
                <Field name="autoRefresh" type="checkbox" />
            </ConfigForm>
        </>
    );
}
