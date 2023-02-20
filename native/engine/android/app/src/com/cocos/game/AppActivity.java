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

import static android.Manifest.permission.CAMERA;
import static android.Manifest.permission.READ_EXTERNAL_STORAGE;
import static android.Manifest.permission.WRITE_EXTERNAL_STORAGE;

import android.graphics.Bitmap;

import android.net.Uri;
import android.os.Bundle;
import android.content.Intent;
import android.os.Environment;
import android.provider.MediaStore;
import android.util.Log;

import android.content.pm.PackageManager;
//import android.support.annotation.NonNull;
//import android.support.v4.app.ActivityCompat;
//import android.support.v4.content.ContextCompat;
//import android.support.v7.app.AppCompatActivity;
import android.widget.ImageView;
import android.widget.Toast;

import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import androidx.core.content.FileProvider;

import com.cocos.service.SDKWrapper;
import com.cocos.lib.CocosActivity;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class AppActivity extends CocosActivity {
    private static final int CAMERA_REQUEST =1;
    private static final int REQUEST_CAMERA = 1;
    private static final int REQUEST_TAKE_PHOTO = 1;
    static Uri capturedImageUri=null;
    private static final int CONTENT_REQUEST=1337;
    private static final int CAMERA_RESULT =1;
    private final String TAG = "abc";

    static final int REQUEST_IMAGE_CAPTURE =1 ;
    ImageView iv;
    Uri imageUri;
    private static File output=null;
    private static String imagePath = null;
    private static final int CAMERA_PERMISSION_CODE = 100;
    private static final int STORAGE_PERMISSION_CODE = 101;
    public static  AppActivity app= null;
    public static boolean flag  =false;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        app = this;
        SDKWrapper.shared().init(this);

    }

    public static String jsLink(final String title) throws InterruptedException {
        Log.d("HI", "jsLink: Executed ");
        String path = null;
        if (app.CheckPermissions()) {
            path = app.imageChooser();
            Log.d("CHECK 1", "Inside IF");
          // Log.d("Returned Path", path);

        } else {
            app.RequestPermissions();
        }
        return  "hello";
    }
    ImageView imageView=null;
    private String imageChooser() throws InterruptedException {
            Intent i = new Intent(Intent.ACTION_PICK,
                    android.provider.MediaStore.Images.Media.INTERNAL_CONTENT_URI);
            final int ACTIVITY_SELECT_IMAGE = 1234;
            Log.d("CCD", "imageChooser: selcct image");
            app.startActivityForResult(i, ACTIVITY_SELECT_IMAGE);
            return imagePath;
    }

    public void onActivityResult(int requestCode, int resultCode, Intent data) {
       super.onActivityResult(requestCode, resultCode, data);
        Log.d("CHECK 2", "Inside onActivityResult");
        if (requestCode == REQUEST_CAMERA && data != null && data.getData() != null) {
                Log.d("BitMapPhoto", "creating image");
                Bundle extras = data.getExtras();
                 Log.d("CHECK 4", String.valueOf(extras));
                 Bitmap imageBitmap = (Bitmap) extras.get("data");

              //  Bitmap imageBitmap = (Bitmap) data.getExtras().get("data");
                Log.d("CHECK 3", String.valueOf(imageBitmap));
                imageView.setImageBitmap(imageBitmap);
        }
    }
        //###############################################################//
//        if (resultCode == RESULT_OK) {
//            Log.d("BitMapPhoto"," IF creating image");
//            Uri selectedImageUri = data.getData();
//            imagePath = getRealPathFromURI(selectedImageUri);
//            //app.returnPath();
//            Log.d("Picture Path", imagePath);
//        }
        //###############################################################//




    public static String imagePath(final String title){
        Log.d("FUNCTION","Inside imagePath");
        //return imagePath;
        return app.currentPhotoPath;
    }

//    public String getRealPathFromURI(Uri uri) {
//        String[] projection = { MediaStore.Images.Media.DATA };
//        @SuppressWarnings("deprecation")
//        Cursor cursor = managedQuery(uri, projection, null, null, null);
//        int column_index = cursor
//                .getColumnIndexOrThrow(MediaStore.Images.Media.DATA);
//        cursor.moveToFirst();
//        return cursor.getString(column_index);
//    }
String currentPhotoPath;
    private File createImageFile() throws IOException {
        String timeStamp = new SimpleDateFormat("yyyyMMdd_HHmmss").format(new Date());
        String imageFileName = "JPEG_" + timeStamp + "_";
        //new File(Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_MUSIC), "audioC.mp3");
        File storageDir = getExternalFilesDir(Environment.DIRECTORY_PICTURES);
        File image = File.createTempFile(
                imageFileName,  /* prefix */
                ".jpg",         /* suffix */
                storageDir      /* directory */
        );
//        File storageDir = getExternalFilesDir(Environment.DIRECTORY_PICTURES);
//        File image = File.createTempFile(
//                imageFileName,  /* prefix */
//                ".jpg",         /* suffix */
//                storageDir      /* directory */
//        );

        // Save a file: path for use with ACTION_VIEW intents
        currentPhotoPath = image.getAbsolutePath();

        return image;
    }

    public static String cameraImage(final String title) {
        if (app.CheckPermissions()) {
            String cameraImagePath = app.saveFile();
            return cameraImagePath;
        }
        
        else{
            app.RequestPermissions();
    }
        return title;
    }
    private void galleryAddPic() {
        Intent mediaScanIntent = new Intent(Intent.ACTION_MEDIA_SCANNER_SCAN_FILE);
        File f = new File(currentPhotoPath);
        Uri contentUri = Uri.fromFile(f);
        mediaScanIntent.setData(contentUri);
        this.sendBroadcast(mediaScanIntent);
    }
    private String saveFile() {
        Intent takePictureIntent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
        // Ensure that there's a camera activity to handle the intent
        if (takePictureIntent.resolveActivity(getPackageManager()) != null) {
            // Create the File where the photo should go
            File photoFile = null;
            try {
                photoFile = createImageFile();
                Log.d("PATH",currentPhotoPath);
            } catch (IOException ex) {
                // Error occurred while creating the File
            }
            // Continue only if the File was successfully created
            if (photoFile != null) {
                Uri photoURI = FileProvider.getUriForFile(this, "com.example.android.fileprovider", photoFile);
                takePictureIntent.putExtra(MediaStore.EXTRA_OUTPUT, photoURI);
                startActivityForResult(takePictureIntent, REQUEST_IMAGE_CAPTURE);
            }
        }
        return currentPhotoPath;
    }


    @Override
    public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
        // this method is called when user will
        // grant the permission for audio recording.
        Log.d("CHECK 3", "onRequestPermission");
        switch (requestCode) {
            case CAMERA_PERMISSION_CODE:
            case STORAGE_PERMISSION_CODE:
                if (grantResults.length > 0) {
                    boolean permissionToStore = grantResults[0] == PackageManager.PERMISSION_GRANTED;
                    boolean permissionToRead = grantResults[1] == PackageManager.PERMISSION_GRANTED;
                    boolean cameraPermission = grantResults[2] == PackageManager.PERMISSION_GRANTED;
                    if (permissionToStore && permissionToRead && cameraPermission) {
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
        int result2 = ContextCompat.checkSelfPermission(getApplicationContext(), CAMERA);
        return result == PackageManager.PERMISSION_GRANTED && result1 == PackageManager.PERMISSION_GRANTED && result2 == PackageManager.PERMISSION_GRANTED ;

    }

    private void RequestPermissions() {
        Log.d("CHECK 2", "Request Permission");
        // this method is used to request the
        // permission for audio recording and storage.
        ActivityCompat.requestPermissions(AppActivity.this, new String[]{WRITE_EXTERNAL_STORAGE,READ_EXTERNAL_STORAGE,CAMERA}, STORAGE_PERMISSION_CODE);
    }
}
// outputFile = new File(Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_MUSIC), "audioC.mp3");
////
//            mRecorder.setOutputFile(outputFile.getAbsolutePath());