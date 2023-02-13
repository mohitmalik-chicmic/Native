/****************************************************************************
Copyright (c) 2015-2016 Chukong Technologies Inc.
Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.

http://www.cocos2d-x.org

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
****************************************************************************/
package com.cocos.game;

import static android.Manifest.permission.READ_EXTERNAL_STORAGE;
import static android.Manifest.permission.WRITE_EXTERNAL_STORAGE;

import android.app.DownloadManager;
import android.content.Context;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Bundle;
import android.os.Environment;
import android.util.Log;
import android.widget.Toast;

import com.cocos.service.SDKWrapper;
import com.cocos.lib.CocosActivity;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
public class AppActivity extends CocosActivity {
    private static AppActivity app = null;
    public static final int REQUEST_STORAGE_PERMISSION_CODE = 1;
    public static String path;
    public static String[] imagePaths;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // DO OTHER INITIALIZATION BELOW
        SDKWrapper.shared().init(this);
        app = this;
    }

    public static int ZipDownload(final int title) throws IOException, InterruptedException {
        Log.d("CHECK 1", "ZipDownlaod Method");
        int fileLength = app.downloadZipFile();
        Log.d("PATHH", path);
        return fileLength;
    }
    public int downloadZipFile() throws IOException, InterruptedException {
        if (CheckPermissions()) {
            DownloadManager manager = (DownloadManager) getSystemService(Context.DOWNLOAD_SERVICE);
            Uri uri = Uri.parse("https://drive.google.com/uc?export=download&id=14MVx2mgsInNdfYx8jQ-6QwwgbPASpxQt");
            DownloadManager.Request request = new DownloadManager.Request(uri);
            request.setNotificationVisibility(DownloadManager.Request.VISIBILITY_VISIBLE);
            request.setDestinationInExternalPublicDir(Environment.DIRECTORY_DOWNLOADS.toString(), "dog.zip");
            long reference = manager.enqueue(request);
            Log.d("REQUEST VAR", Environment.DIRECTORY_DOWNLOADS.toString()+"/dog.zip");
            Thread.sleep(4000);
            unzip(new File(Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS), "dog.zip"), new File(String.valueOf(Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS))));
            File dir = new File(String.valueOf(Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_MOVIES)));
            if (dir.exists()) {
                File[] files = dir.listFiles();
                if (files != null) {
                    return files.length;
                }}
            //traverse(new File(String.valueOf(Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_MOVIES))));
            //return oneImagePath;

        } else {
            Log.d("PERMISSION", "Need Permission");
            RequestPermissions();

        }

        return 0;
    }
//    public void traverse (File dir) {
//        if (dir.exists()) {
//            File[] files = dir.listFiles();
//            if (files != null) {
//
//                for (int i = 0; i < files.length; ++i) {
//                    File file = files[i];
//                    if (file.isDirectory()) {
//                        traverse(file);
//                    } else {
//                        Log.d("traverse", String.valueOf(file));
//                       // getImages(String.valueOf(file));
//                        //return String.valueOf(file);
//                        // do something here with the file
//                    }
//                }
//            }
//        }
//    }

    public static String getImages(final int index){
       // Log.d("GetImagesMethod", "getImages: ");
        File dir = new File(String.valueOf(Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_MOVIES)));
        if (dir.exists()) {
            File[] files = dir.listFiles();
            if (files != null) {

              //  for (int i = index; i < files.length; ++i) {
                    File file = files[index];
                    if (file.isDirectory()) {
                    } else {
                       // Log.d("traverse", String.valueOf(file));
//                        imagePaths[index] = String.valueOf(file);
                        return String.valueOf(file);

                        // do something here with the file
                    }
               // }
            }
        }
        return null;
    }


    public static void unzip(File zipFile, File targetDirectory) throws IOException {
        ZipInputStream zis = new ZipInputStream(
                new BufferedInputStream(new FileInputStream(zipFile)));
        try {
            ZipEntry ze;
            int count;
            byte[] buffer = new byte[8192];
            while ((ze = zis.getNextEntry()) != null) {
                File file = new File(targetDirectory, ze.getName());
                File dir = ze.isDirectory() ? file : file.getParentFile();
                if (!dir.isDirectory() && !dir.mkdirs())
                    throw new FileNotFoundException("Failed to ensure directory: " +
                            dir.getAbsolutePath());
                if (ze.isDirectory())
                    continue;
                FileOutputStream fout = new FileOutputStream(file);
                path = String.valueOf(Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS));
                try {
                    while ((count = zis.read(buffer)) != -1)
                        fout.write(buffer, 0, count);
                } finally {
                    fout.close();
                }
            /* if time should be restored as well
            long time = ze.getTime();
            if (time > 0)
                file.setLastModified(time);
            */
            }
        } finally {
            zis.close();
        }
    }
    @Override
    public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
        // this method is called when user will
        // grant the permission for audio recording.
        Log.d("CHECK 3", "onRequestPermission");
        switch (requestCode) {
            case REQUEST_STORAGE_PERMISSION_CODE:
                if (grantResults.length > 0) {
                    boolean permissionToStore = grantResults[0] == PackageManager.PERMISSION_GRANTED;
                    boolean permissionToRead = grantResults[1] == PackageManager.PERMISSION_GRANTED;
                    if (permissionToStore && permissionToRead) {
                        Toast.makeText(getApplicationContext(), "Permission Granted", Toast.LENGTH_LONG).show();
                        Log.d("CHECK 4", "Permission Granted");
                    } else {
                        Toast.makeText(getApplicationContext(), "Permission Denied", Toast.LENGTH_LONG).show();
                        Log.d("CHECK 5", "Permission Denied");
                    }
                }
                break;
        }
    }

    public boolean CheckPermissions() {
        // this method is used to check permission
        Log.d("CHECK 1", "Check Permission");
        int result = ContextCompat.checkSelfPermission(getApplicationContext(), WRITE_EXTERNAL_STORAGE);
        int result1 = ContextCompat.checkSelfPermission(getApplicationContext(), READ_EXTERNAL_STORAGE);
        return result == PackageManager.PERMISSION_GRANTED && result1 == PackageManager.PERMISSION_GRANTED ;

    }

    private void RequestPermissions() {
        Log.d("CHECK 2", "Request Permission");
        // this method is used to request the
        // permission for audio recording and storage.
        ActivityCompat.requestPermissions(AppActivity.this, new String[]{WRITE_EXTERNAL_STORAGE,READ_EXTERNAL_STORAGE}, REQUEST_STORAGE_PERMISSION_CODE);
    }
}


//    @Override
//    protected void onResume() {
//        super.onResume();
//        SDKWrapper.shared().onResume();
//    }
//
//    @Override
//    protected void onPause() {
//        super.onPause();
//        SDKWrapper.shared().onPause();
//    }
//
//    @Override
//    protected void onDestroy() {
//        super.onDestroy();
//        // Workaround in https://stackoverflow.com/questions/16283079/re-launch-of-activity-on-home-button-but-only-the-first-time/16447508
//        if (!isTaskRoot()) {
//            return;
//        }
//        SDKWrapper.shared().onDestroy();
//    }
//
//    @Override
//    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
//        super.onActivityResult(requestCode, resultCode, data);
//        SDKWrapper.shared().onActivityResult(requestCode, resultCode, data);
//    }
//
//    @Override
//    protected void onNewIntent(Intent intent) {
//        super.onNewIntent(intent);
//        SDKWrapper.shared().onNewIntent(intent);
//    }
//
//    @Override
//    protected void onRestart() {
//        super.onRestart();
//        SDKWrapper.shared().onRestart();
//    }
//
//    @Override
//    protected void onStop() {
//        super.onStop();
//        SDKWrapper.shared().onStop();
//    }
//
//    @Override
//    public void onBackPressed() {
//        SDKWrapper.shared().onBackPressed();
//        super.onBackPressed();
//    }
//
//    @Override
//    public void onConfigurationChanged(Configuration newConfig) {
//        SDKWrapper.shared().onConfigurationChanged(newConfig);
//        super.onConfigurationChanged(newConfig);
//    }
//
//    @Override
//    protected void onRestoreInstanceState(Bundle savedInstanceState) {
//        SDKWrapper.shared().onRestoreInstanceState(savedInstanceState);
//        super.onRestoreInstanceState(savedInstanceState);
//    }
//
//    @Override
//    protected void onSaveInstanceState(Bundle outState) {
//        SDKWrapper.shared().onSaveInstanceState(outState);
//        super.onSaveInstanceState(outState);
//    }
//
//    @Override
//    protected void onStart() {
//        SDKWrapper.shared().onStart();
//        super.onStart();
//    }
//
//    @Override
//    public void onLowMemory() {
//        SDKWrapper.shared().onLowMemory();
//        super.onLowMemory();
//    }



